//! Real APIs
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use crate::init_or_not;
use super::Init;

#[tauri::command]
pub fn init() -> String {
    if init_or_not().unwrap() {
        let init_obj = Init::new();
        init_obj.init_all();
    }
    return String::from("init successfully!");
}