//! 作用于Settings的API
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
use serde::{Serialize, Deserialize};
use super::{CONF_DIR, CONF_FILE, TEMPLATE_DIR, CONF_PATH};
use std::fs::{read_to_string, write};
use std::path::Path;
use std::env;

/// 配置类
/// 从0.0.2开始有version字段
#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Settings {
    version: String,
    store: String,
    template: String,
    // 运行目录
    dir: String,
    auto: bool,
    proportion: String,
    language: Language,
    email: String,
    password: String,
    smtp: String,
    contacts: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub enum Language {
    Chinese,
    English,
}

impl Default for Settings {
    fn default() -> Self {
        Settings {
            version: "0.0.2".to_string(),
            store: format!("./{}/{}.json", CONF_DIR, CONF_FILE),
            template: format!("./{}", TEMPLATE_DIR),
            dir: "".to_string(),
            auto: false,
            proportion: "13:7".to_string(),
            language: Language::Chinese,
            email: "".to_string(),
            password: "".to_string(),
            smtp: "".to_string(),
            contacts: vec![],
        }
    }
}

///  From string -> struct (serde)
impl From<String> for Settings {
    fn from(value: String) -> Self {
        let res = serde_json::from_str(&value).unwrap_or(Settings::default());
        res
    }
}

impl Settings {
    pub fn new() -> Self {
        Settings::default()
    }
    fn get_store(&self) -> &str {
        &self.store
    }
    pub fn get_template(&self) -> &str { &self.template }
    pub fn push_contact(&mut self, contact: &str) {
        self.contacts.push(contact.to_string())
    }
    pub fn get_dir(&self) -> &str { &self.dir }
    pub fn get_version(&self) -> &str {
        &self.version
    }
    pub fn set_dir(&mut self, dir: &str) -> () { self.dir = String::from(dir) }
    pub fn pop_contact(&mut self, contact: &str) {
        self.contacts.retain(|x| x.ne(contact))
    }
    pub fn get_password(&self) -> &str {
        &self.password
    }
    pub fn get_smtp(&self) -> &str {
        &self.smtp
    }
    /// 配置存储
    pub fn store_config(&self) {
        // Settings -> Json
        let json_str = serde_json::to_string_pretty(&self.clone()).unwrap();
        // store in conf dir
        let conf_path = Path::new(self.get_store());
        let _ = write(conf_path, json_str);
    }
    /// 获取软件目录
    pub fn get_software_dir() -> String {
        match env::current_dir() {
            Ok(path) => {
                let path_str = path.to_str().unwrap();
                path_str.to_string()
            }
            Err(_) => {
                "".to_string()
            }
        }
    }
    pub fn get_settings() -> Settings {
        let conf_path = Path::new(CONF_PATH);
        let settings: Settings = read_to_string(conf_path).unwrap().into();
        settings
    }
}