function exit() {
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
}
function maximize() {

}