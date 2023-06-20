//! Real APIs
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use crate::{init_or_not,replace_name};
use super::{Init, Settings, CONF_FILE, CONF_DIR,HTML};
use std::fs::{write, read_to_string};
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
    let settings = init_obj.get_config_settings();
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
pub fn download_template(name: &str, data: &str,dom:&str) {
    // read configuration file
    let conf_path = Path::new("./conf/EStylist_config.json");
    let conf: Settings = read_to_string(conf_path).unwrap().into();
    let template_path = format!("{}/{}.json", conf.get_template(), name);
    let template_data_path = format!("{}/{}.html", conf.get_template(), name);
    let template_path = Path::new(&template_path);
    let template_data_path = Path::new(&template_data_path);
    let _ = write(template_path, data).expect("Couldn't Download");
    let mut html_dom = HTML.replace("$name$",name);
    html_dom = html_dom.replace("$content$",dom);
    let _ = write(template_data_path, html_dom).expect("Couldn't Download Template");
}