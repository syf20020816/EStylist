//! Utils
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use std::fs::{File, read_to_string};
use std::path::Path;
use tauri::regex::Regex;


/// Init or not ? init -> true
/// has /conf/EStylist_config.json ? no -> init | yes -> check
/// check empty ? yes -> init
pub fn init_or_not() -> Result<bool, Box<&'static str>> {
    let path = Path::new("./conf/EStylist_config.json");
    if path.try_exists().unwrap() {
        //check
        if path.is_file() {
            let file_str = read_to_string(path).unwrap();
            if file_str.is_empty() {
                return Ok(true);
            } else {
                return Ok(false);
            }
        } else {
            return Ok(true);
        }
    }
    return Ok(true);
}

/// 匹配
pub fn replace_name(origin_str:&str,target:&str)->String{
    let re = Regex::new(r"\$name\$").unwrap();
    // let re = Regex::new(r"\$(\w+)\$").unwrap();
    re.replace_all(origin_str, target).to_string()
}