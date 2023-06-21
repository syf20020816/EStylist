//! Real APIs
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use std::ffi::OsStr;
use crate::{init_or_not, replace_name};
use super::{Init, Settings, CONF_FILE, CONF_DIR, HTML};
use std::fs::{write, read_to_string, read_dir};
use std::path::Path;


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



#[tauri::command]
pub fn load_html_templates()  -> Vec<String>{
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



#[tauri::command]
pub fn upload_file(name:&str)->String{
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
pub fn add_contact(email:&str)->String{
    let conf_path = Path::new("./conf/EStylist_config.json");
    let mut settings: Settings = read_to_string(conf_path).unwrap().into();
    let _ = settings.push_contact(email);
    // store
    settings.store_config();
    serde_json::to_string(&settings).unwrap()
}