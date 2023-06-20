//! Init Service
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```
use std::fs::{create_dir, create_dir_all, File, read_to_string};
use std::path::{Path};
use serde::{Serialize, Deserialize};
use super::{CONF_DIR, CONF_FILE, TEMPLATE_DIR, DOC_DIR, DOC_FILE, DOC_DOWNLOAD_URL, README, README_CONTENT};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Init {
    default_path: String,
    conf_path: String,
    conf_name: String,
    conf_type: String,
    templates_path: String,
    templates_type: String,
    templates_data_type: String,
    doc_path: String,
    doc_name: String,
    common_type: String,
    repository: String,
}


impl Default for Init {
    fn default() -> Self {
        Init {
            default_path: ".".to_string(),
            conf_path: CONF_DIR.to_string(),
            conf_name: CONF_FILE.to_string(),
            conf_type: "json".to_string(),
            templates_path: TEMPLATE_DIR.to_string(),
            templates_type: "html".to_string(),
            templates_data_type: "json".to_string(),
            doc_path: DOC_DIR.to_string(),
            doc_name: DOC_FILE.to_string(),
            common_type: "txt".to_string(),
            repository: "https://github.com/syf20020816/EStylist".to_string(),
        }
    }
}

impl Init {
    pub fn new() -> Self {
        Init::default()
    }
    fn get_default_path(&self) -> &str {
        &self.default_path
    }
    fn get_conf_path(&self) -> &str { &self.conf_path }
    fn get_conf_name(&self) -> &str { &self.conf_name }
    fn get_conf_type(&self) -> &str { &self.conf_type }
    fn get_templates_path(&self) -> &str { &self.templates_type }
    fn get_templates_type(&self) -> &str { &self.templates_type }
    fn get_templates_data_type(&self) -> &str { &self.templates_data_type }
    fn get_doc_path(&self) -> &str { &self.doc_path }
    fn get_doc_name(&self) -> &str { &self.doc_name }
    fn get_common_type(&self) -> &str { &self.common_type }
    /// p_type is empty -> dir
    /// p_type not empty -> file
    fn build_path(&self, parent: &str, dir: &str, name: &str, p_type: &str) -> String {
        // dir
        if name.is_empty() {
            return format!("{}/{}", parent, dir);
        }
        format!("{}/{}/{}.{}", parent, dir, name, p_type)
    }
    fn create_item(&self, path: &Path, is_file: bool) {
        if !path.try_exists().unwrap() {
            if !is_file {
                create_dir(path);
            } else {
                File::create(path);
            }
        }
    }

    /// init files , dirs
    pub fn init_all(&self) {
        //init conf
        let conf_dir_str = self.build_path(self.get_default_path(), self.get_conf_path(), "", "");
        let conf_dir_path = Path::new(&conf_dir_str);
        self.create_item(conf_dir_path, false);
        let conf_file_str = self.build_path(self.get_default_path(), self.get_conf_path(), self.get_conf_name(), self.get_conf_type());
        self.create_item(Path::new(&conf_file_str), true);
        //init templates

        //init doc

        //init readme
    }
}