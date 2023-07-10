//! Utils
//! ```txt
//! @author:syf20020816@Outlook.com
//! @date:2023/6/20
//! @version:0.0.1
//! @description:
//! ```

use std::fs::{File, read_to_string};
use std::path::Path;
use std::str::FromStr;


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

/// 将版本转为版本号以数字表示，数字越大，版本越高
pub fn version_to_number(version: &str) -> f32 {
    // 正式版 like: 0.1.0
    // 测试版 like: 0.1.0-beta
    // 抢先版 like: 0.1.0-alpha
    // 计算规则:
    // 0.1.0 -> 0*10000 + 1 * 100 + 0 * 1 = 100
    // beta = + 0.2
    // alpha  = + 0.1
    let mut version_num: f32 = 0.0;
    //获取处理好的version
    let version_str = if version.contains('-') {
        let version_spl: Vec<&str> = version.split("-").collect();
        if "beta".eq(version_spl[1]) {
            version_num += 0.2_f32;
        } else {
            // 由于我之分3种版本所以可以直接else
            version_num += 0.1_f32;
        }
        version_spl[0]
    } else { version };

    let version_spl: Vec<&str> = version_str.split(".").collect();
    let mut version_nums = Vec::<u32>::new();
    for ver in version_spl {
        version_nums.push(u32::from_str(ver).unwrap());
    }
    let level1 = version_nums.get(0).unwrap() * 10000;
    let level2 = version_nums.get(1).unwrap() * 100;
    let level3 = version_nums.get(2).unwrap() * 1;
    version_num += (level1+level2+level3) as f32;
    version_num
}