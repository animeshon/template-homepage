import MemoryStore from 'cache-manager-memory-store';
import cacheManager from 'cache-manager';
import path from 'path';
import fm from 'front-matter';
import fs from 'fs-extra';

let globalCache = undefined;

const blogPath = './blog/';

export const GetGlobalBlogCache = () => {
    if (globalCache == undefined) {
        globalCache = new BlogCache();
    }
    return globalCache;
}

class BlogCache {
    constructor() {
        // this.memoryCache = cacheManager.caching({ store: 'memory', ttl: 60*60*10/*10 hours*/ });
        this.memoryCache = cacheManager.caching({ store: 'memory', ttl: 1 });
    };

    getfsBlog = () => {
        const ssrMode = typeof window === "undefined";
        if (!ssrMode) {
            return undefined;
        }
        let arr = [];
        let items = fs.readdirSync(blogPath);
        for (var i = 0; i < items.length; i++) {
            const filePath = path.join(blogPath, items[i]);
            const { ext, name } = path.parse(filePath);
            // Only process markdown/mdx files that are not index.tsx pages
            if (ext.startsWith('.md') && ext !== 'index') {
                try {
                    let data = fm(fs.readFileSync(filePath, 'utf8'));
                    if (data.attributes.visibility == "hide") {
                        continue;
                    }
                    arr.push({
                        ...data.attributes,
                    });
                } catch (e) {
                    console.log(`Error reading frontmatter of ${filePath}`, e);
                }
            }
        };
        return arr.sort(function (a, b) {
            return (new Date(a.publishedAt).getTime() < new Date(b.publishedAt).getTime()) ? 1 : -1;
        });
    };

    GetWithBody = (slug) => {
        let items = fs.readdirSync(blogPath);
        for (var i = 0; i < items.length; i++) {
            const filePath = path.join(blogPath, items[i]);
            const { ext, name } = path.parse(filePath);
            // Only process markdown/mdx files that are not index.tsx pages
            if (ext.startsWith('.md') && ext !== 'index') {
                try {
                    let data = fm(fs.readFileSync(filePath, 'utf8'));
                    if (!data.attributes.slug || data.attributes.slug != slug) {
                        continue;
                    }
                    return {
                        body: data.body,
                        ...data.attributes,
                    };
                } catch (e) {
                    console.log(`Error reading frontmatter of ${filePath}`, e);
                }
            }
        };
        return undefined;
    };

    Refresh = (data) => {
        this.memoryCache.set("_", data, function (err) {
            if (err) { throw err; }
        });
    };

    FilterCategories = (posts) => {
        return posts.filter((v,i,a) => {return v.cat == undefined || a.findIndex(t=>(t.cat === v.cat))===i});
    };

    GetOrRefresh = async () => {
        let that = this;
        return await this.memoryCache.get("_").then((result, err) => {
            if (err) { throw err; }
            if (result == undefined) {
                const data = that.getfsBlog();
                that.Refresh(data);
                return data;
            } else {
                return result;
            }
        });
    };

    Get = () => {
        let data = undefined;
        this.memoryCache.get("_", function (err, result) {
            if (err) { throw err; }
            data = result;
        });
        return data;
    };
};

export default BlogCache;