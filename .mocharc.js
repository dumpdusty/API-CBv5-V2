module.exports = {
    require: ['@babel/register'],
    spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `project-config/auth-global-hook.js`,
    timeout: '20000',
    reporter: 'mochawesome',
    'reporter-options': 'reportDir=MyReports,reportFilename=updatedReport,json=false',
}
