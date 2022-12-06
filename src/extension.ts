import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let previewPanel: vscode.WebviewPanel | undefined = undefined;

  vscode.commands.registerCommand("dbml-preview.openPreview", () => {
    const columnToShowIn =
      vscode.window.activeTextEditor?.viewColumn || vscode.ViewColumn.One;

    if (previewPanel) {
      previewPanel.reveal(columnToShowIn);
    } else {
      previewPanel = vscode.window.createWebviewPanel(
        "data-base-schema-preview",
        "Database Schema Preview",
        columnToShowIn,
        {}
      );

      previewPanel.onDidDispose(
        () => {
          previewPanel = undefined;
        },
        null,
        context.subscriptions
      );
    }
  });
}

export function deactivate() {}
