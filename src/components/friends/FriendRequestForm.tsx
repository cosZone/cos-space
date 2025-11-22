import { friendsIntro } from '@constants/friends-config';
import { useState } from 'react';
import SakuraSVG from '../svg/SakuraSvg';

interface FormData {
  site: string;
  owner: string;
  url: string;
  desc: string;
  image: string;
  color: string;
}

export default function FriendRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    site: '',
    owner: '',
    url: '',
    desc: '',
    image: '',
    color: '#ffc0cb',
  });

  const [copied, setCopied] = useState(false);

  const generateText = () => {
    return `site: ${formData.site || '站点名称'}
url: ${formData.url || 'https://example.com'}
owner: ${formData.owner || '您的昵称'}
desc: ${formData.desc || '站点描述'}
image: ${formData.image || 'https://example.com/avatar.jpg'}
color: "${formData.color || '#ffc0cb'}"`;
  };

  const handleCopy = async () => {
    const yaml = generateText();
    await navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-4 w-full">
      <div className="relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm md:p-3 dark:border-gray-800 dark:bg-gray-900">
        {/* Cute Corner Decor */}
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-pink-100/50 dark:bg-pink-900/20" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-100/50 dark:bg-blue-900/20" />

        <div className="grid grid-cols-2 gap-12 md:grid-cols-1 md:gap-8">
          {/* Left Side: Form */}
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="mb-2 flex items-center gap-2 text-2xl font-black text-gray-800 dark:text-white">
                <SakuraSVG className="size-6 animate-spin text-[#FFC0CB] duration-10000" />
                申请友链
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{friendsIntro.applyDesc}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">站点名称</label>
                  <input
                    type="text"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                    placeholder="我的博客"
                  />
                </div>
                <div className="group relative">
                  <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">昵称</label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                    placeholder="您的昵称"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">站点链接</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                  placeholder="https://your-site.com"
                />
              </div>

              <div className="group relative">
                <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">站点描述</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={2}
                  className="w-full resize-none rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                  placeholder="一句话描述..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">头像链接</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                    placeholder="https://..."
                  />
                </div>
                <div className="group relative">
                  <label className="mb-1.5 block text-xs font-bold tracking-wide text-gray-400 uppercase">主题色</label>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-gray-100 shadow-sm transition-transform hover:scale-105 dark:border-gray-700">
                      <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] cursor-pointer p-0"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:focus:border-pink-700 dark:focus:bg-gray-800 dark:focus:ring-pink-900/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Preview / Code */}
          <div className="relative flex flex-col justify-center rounded-xl bg-gray-50 p-6 md:p-3 dark:bg-gray-800/50">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-wider uppercase">配置预览</h3>
              <button
                onClick={handleCopy}
                className="group relative px-3 py-2 text-base font-bold transition-transform hover:-translate-y-1 dark:text-white"
              >
                <div className="border-foreground absolute inset-0 rotate-[1deg] rounded-lg border-2 border-dashed transition-all group-hover:rotate-0 dark:border-white"></div>
                {copied ? '已复制!' : '复制配置'}
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-xl border-2 border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-950/50">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                {generateText()}
              </pre>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-pink-50 p-4 text-xs font-medium text-pink-600 dark:bg-pink-900/20 dark:text-pink-300">
              提示: 复制上方代码并在下方评论区粘贴发送即可，我会收到的～
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
