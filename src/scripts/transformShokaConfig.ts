// 旧 Shoka 配置文件转换
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';

type Config = {
  category_map: Record<string, string>;
};

function transformShokaConfig() {
  try {
    // 读取 _config.yml 文件
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const configPath = path.join(currentDir, '_config.yml');
    // 添加文件存在性检查
    if (!fs.existsSync(configPath)) {
      // console.log('旧 Shoka 配置文件不存在，使用默认配置:', configPath);
      return null;
    }
    const fileContents = fs.readFileSync(configPath, 'utf8');

    // 解析 YAML
    const config: Config = yaml.load(fileContents) as Config;

    if (!config) return null;
    // 提取 category_map
    const categoryMap = config.category_map || {};
    // console.log('分类映射已成功转换:', categoryMap);
    return { categoryMap };
  } catch (error) {
    console.error('转换分类配置时出错:', error);
    return null;
  }
}

export default transformShokaConfig;
