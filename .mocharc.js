module.exports = {
    require: ['@babel/register'],
    spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `project-config/auth-global-hook.js`,
    timeout: '5000'
}
