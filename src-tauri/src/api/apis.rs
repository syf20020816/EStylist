//! Real APIs
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use crate::init_or_not;
use super::{Init, Settings,CONF_FILE, CONF_DIR};


/// Init Service
#[tauri::command]
pub fn init() -> String {
    let init_obj = Init::new();
    // judge init
    if init_or_not().unwrap() {
        init_obj.init_all();
    }
    // get config
    let settings =  init_obj.get_config_settings();
    serde_json::to_string(&settings).unwrap()
}

/// Save the settings
#[tauri::command]
pub fn save_settings(settings:&str){
    //to Settings and save
    let settings:Settings = String::from(settings).into();
    settings.store_config();
}