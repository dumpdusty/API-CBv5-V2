module.exports = {
    require: ['@babel/register'],
    //spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `project-config/auth-global-hook.js`,
    timeout: '20000',
    reporter: 'mochawesome',
    reporterOptions: ['reportDir=MyReports', 'reportFilename=updatedReport','json=false']
}
