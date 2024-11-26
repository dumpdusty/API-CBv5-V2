module.exports = {
    require: '@babel/register',
    //spec: 'test/**/*.js',
    exclude: 'test/example.spec.js',
    file: `project-config/auth-global-hook.js`,
    timeout: '60000',
    reporter: 'mochawesome',
    reporterOptions: ['reportDir=MyReports', 'reportFilename=updatedReport','json=false']
}
