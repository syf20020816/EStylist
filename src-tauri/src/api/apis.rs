//! Real APIs
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use std::ffi::OsStr;
use crate::{init_or_not, version_to_number};
use super::{Init, Settings, CONF_FILE, CONF_DIR, HTML, UPDATE_RELEASE};
use std::fs::{write, read_to_string, read_dir};
use std::path::Path;
use lettre::{Message, SmtpTransport, Transport};
use lettre::transport::smtp::authentication::Credentials;
use lettre::message::header::ContentType;
use lettre::transport::smtp::Error;
use lettre::transport::smtp::response::Response;
use reqwest::blocking::Client;
use serde_json::Value;


/// Init Service
#[tauri::command]
pub fn init() -> String {
    let init_obj = Init::new();
    // judge init
    if init_or_not().unwrap() {
        init_obj.init_all();
    }
    // get config
    let conf_path = Path::new("./conf/EStylist_config.json");
    let settings: Settings = read_to_string(conf_path).unwrap().into();
    serde_json::to_string(&settings).unwrap()
}

/// Save the settings
#[tauri::command]
pub fn save_settings(settings: &str) {
    //to Settings and save
    let settings: Settings = String::from(settings).into();
    settings.store_config();
}

/// 下载模板到本地
#[tauri::command]
pub fn download_template(name: &str, data: &str, dom: &str) {
    // read configuration file
    let conf_path = Path::new("./conf/EStylist_config.json");
    let conf: Settings = read_to_string(conf_path).unwrap().into();
    let template_path = format!("{}/{}.json", conf.get_template(), name);
    let template_data_path = format!("{}/{}.html", conf.get_template(), name);
    let template_path = Path::new(&template_path);
    let template_data_path = Path::new(&template_data_path);
    let _ = write(template_path, data).expect("Couldn't Download");
    let mut html_dom = HTML.replace("$name$", name);
    html_dom = html_dom.replace("$content$", dom);
    let _ = write(template_data_path, html_dom).expect("Couldn't Download Template");
}

/// 上传模板
#[tauri::command]
pub fn load_templates() -> Vec<String> {
    let conf_path = Path::new("./conf/EStylist_config.json");
    let conf: Settings = read_to_string(conf_path).unwrap().into();
    let template_path = Path::new(conf.get_template());
    let files = read_dir(template_path).unwrap();
    let mut json_files = vec![];
    for file_entry in files {
        let file = file_entry.unwrap();
        if file.file_type().unwrap().is_file() {
            let file_path = file.path();
            //获取扩展名
            if let Some(extension) = file_path.extension() {
                if extension.eq("json") {
                    let file_name = file_path.file_name();
                    match file_name {
                        Some(name) => {
                            json_files.push(name.to_str().unwrap().to_string())
                        }
                        None => ()
                    }
                }
            }
        }
    }
    return json_files;
}

/// 上传html预览模板
#[tauri::command]
pub fn load_html_templates() -> Vec<String> {
    let conf_path = Path::new("./conf/EStylist_config.json");
    let conf: Settings = read_to_string(conf_path).unwrap().into();
    let template_path = Path::new(conf.get_template());
    let files = read_dir(template_path).unwrap();
    let mut html_files = vec![];
    for file_entry in files {
        let file = file_entry.unwrap();
        if file.file_type().unwrap().is_file() {
            let file_path = file.path();
            //获取扩展名
            if let Some(extension) = file_path.extension() {
                if extension.eq("html") {
                    let file_name = file_path.file_name();
                    match file_name {
                        Some(name) => {
                            html_files.push(name.to_str().unwrap().to_string())
                        }
                        None => ()
                    }
                }
            }
        }
    }
    return html_files;
}

/// 上传文件
#[tauri::command]
pub fn upload_file(name: &str) -> String {
    let conf_path = Path::new("./conf/EStylist_config.json");
    let conf: Settings = read_to_string(conf_path).unwrap().into();
    let template_path = format!("{}/{}", conf.get_template(), name);
    let template_path = Path::new(&template_path);
    // read and get json str
    let res = read_to_string(template_path).unwrap();
    res
}


/// add contact return Settings
#[tauri::command]
pub fn add_contact(email: &str) -> String {
    let conf_path = Path::new("./conf/EStylist_config.json");
    let mut settings: Settings = read_to_string(conf_path).unwrap().into();
    let _ = settings.push_contact(email);
    // store
    settings.store_config();
    serde_json::to_string(&settings).unwrap()
}

/// delete a contact
#[tauri::command]
pub fn del_contact(email: &str) -> String {
    let conf_path = Path::new("./conf/EStylist_config.json");
    let mut settings: Settings = read_to_string(conf_path).unwrap().into();
    settings.pop_contact(email);
    // store
    settings.store_config();
    serde_json::to_string(&settings).unwrap()
}

/// send email
#[tauri::command]
pub fn send_email(from: &str, cc: &str, to: &str, subject: &str, content: &str) -> String {
    // get pwd
    let conf_path = Path::new("./conf/EStylist_config.json");
    let mut settings: Settings = read_to_string(conf_path).unwrap().into();
    let pwd = String::from(settings.get_password());

    let mut from_mut = from;
    let mut to_mut = to;
    let mut cc_mut = cc;
    let smtp = settings.get_smtp();
    let cred = Credentials::new(from_mut.to_string(), pwd);

    let mailer = SmtpTransport::relay(smtp)
        .unwrap().credentials(cred).build();
    if cc.is_empty() {
        let email = Message::builder()
            .from(from_mut.parse().unwrap())
            .to(to_mut.parse().unwrap())
            .subject(subject)
            .header(ContentType::TEXT_HTML).body(String::from(content)).unwrap();
        // Send
        match mailer.send(&email) {
            Ok(_) => "Send Successfully".to_string(),
            Err(e) => e.to_string()
        }
    } else {
        let email = Message::builder()
            .from(from_mut.parse().unwrap())
            .reply_to(cc_mut.parse().unwrap())
            .to(to_mut.parse().unwrap())
            .subject(subject)
            .header(ContentType::TEXT_HTML).body(String::from(content)).unwrap();
        // Send
        match mailer.send(&email) {
            Ok(_) => "Send Successfully".to_string(),
            Err(e) => e.to_string()
        }
    }
}

/// check update from github
#[tauri::command]
pub fn check_update() -> bool {
    // use std::fs;
    // use std::process::Command;
    //
    // fn check_and_update(version: &str) -> Result<(), Box<dyn std::error::Error>> {
    //     let config_path = "conf/config.json";
    //     let config_contents = fs::read_to_string(config_path)?;
    //     let config_json: Value = serde_json::from_str(&config_contents)?;
    //     let current_version = config_json["version"].as_str().unwrap();
    //
    //     if current_version != version {
    //         // 下载最新release
    //         let download_url = format!("https://github.com/syf20020816/EStylist/releases/download/{}/EStylist.zip", version);
    //         let download_path = "EStylist.zip";
    //         let mut download_command = Command::new("curl");
    //         download_command.arg("-L").arg("-o").arg(download_path).arg(&download_url).output()?;
    //
    //         // 解压缩并安装
    //         let install_dir = "<用户安装旧版本的目录>"; // 需要替换为实际的路径
    //         let mut unzip_command = Command::new("unzip");
    //         unzip_command.arg(download_path).arg("-d").arg(install_dir).output()?;
    //     }
    //
    //     Ok(())
    // }
    let url = UPDATE_RELEASE;
    let client = Client::new();

    let res = client
        .get(url)
        .header("User-Agent", "syf20020816")
        .send()
        .unwrap()
        .text()
        .unwrap();

    let val: Value = serde_json::from_str(&res).unwrap();
    // github上发布的最新版本
    let version_pre = val["tag_name"].as_str().unwrap().to_owned();
    let version_pre = version_pre.replace("v","");
    // 获取当前版本
    let settings = Settings::get_settings();
    let version_current = settings.get_version();
    if version_pre.eq(version_current) {
        // version 相同不需要更新
        return false;
    } else {
        // 不同 , 判断当前版本和GitHub上的版本哪个更高
        let current_num = version_to_number(version_current);
        let pre_num = version_to_number(&version_pre);
        (pre_num - current_num) > 0_f32
    }
}

