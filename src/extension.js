const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
		context.subscriptions.push(vscode.commands.registerCommand(
			'CPG.createQuickC51', () => {
				require('./C51').createProject();
		}));
}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}