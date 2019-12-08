const fs = require('fs');
const path = require('path');

module.exports = getFiles = baseDir => {
    const preparePath = (prefix, name) => [...prefix ? [prefix] : [], name].join('/');
    const files = (dir, prefix) => fs.readdirSync(dir, 'utf8')
        .reduce((list, current) => {
            const stats = fs.lstatSync(`${dir}/${current}`);
            const name = preparePath(prefix, current);

            if (stats.isDirectory()) {
                return [...list, ...files(`${dir}/${current}`, name)];
            } else {
                return [...list, name];
            }
        }, [])

    return files(baseDir).reduce((entries, file) => {
        const moduleName = file.substring(0, file.indexOf('.js'))

        return {
            ...entries,
            [moduleName]: preparePath(baseDir, file),
        }
    }, {});
};

