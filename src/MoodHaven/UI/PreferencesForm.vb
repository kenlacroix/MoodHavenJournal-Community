Imports System
Imports System.IO
Imports System.Windows.Forms
Imports System.Drawing
Imports MaterialSkin
Imports MaterialSkin.Controls
Imports MoodHavenJournal_Core.Services
Imports MoodHavenJournal_Core.Utils

Namespace UI
    Public Class PreferencesForm
        Inherits MaterialForm

        ' Controls
        Private txtDataPath As MaterialTextBox2
        Private btnBrowsePath As MaterialButton
        Private btnSavePath As MaterialButton

        Private txtOldPwd As MaterialTextBox2
        Private txtNewPwd As MaterialTextBox2
        Private txtConfirmPwd As MaterialTextBox2
        Private btnChangePwd As MaterialButton

        Private btnViewLog As MaterialButton
        Private btnExportJournal As MaterialButton
        Private btnExportKey As MaterialButton
        Private btnWipeData As MaterialButton

        Private chkDarkMode As MaterialCheckbox

        Public Sub New(currentPath As String, currentTheme As String)
            ' MaterialSkin setup
            Dim manager As MaterialSkinManager = MaterialSkinManager.Instance
            manager.AddFormToManage(Me)
            manager.Theme = If(currentTheme = "Dark", MaterialSkinManager.Themes.DARK, MaterialSkinManager.Themes.LIGHT)
            manager.ColorScheme = New ColorScheme(Primary.Blue600, Primary.Blue900, Primary.Blue200, Accent.LightBlue200, TextShade.WHITE)

            InitializeComponent()
            txtDataPath.Text = currentPath
            chkDarkMode.Checked = (currentTheme = "Dark")
        End Sub

        Private Sub InitializeComponent()
            Me.Text = "Preferences"
            Me.Size = New Size(600, 600)

            ' Data folder section
            txtDataPath = New MaterialTextBox2() With {
                .Hint = "Data Folder",
                .Location = New Point(30, 80),
                .Size = New Size(400, 48),
                .ReadOnly = True
            }
            Controls.Add(txtDataPath)

            btnBrowsePath = New MaterialButton() With {
                .Text = "Browse",
                .Location = New Point(440, 80),
                .Size = New Size(100, 36)
            }
            AddHandler btnBrowsePath.Click, AddressOf OnBrowsePath
            Controls.Add(btnBrowsePath)

            btnSavePath = New MaterialButton() With {
                .Text = "Save",
                .Location = New Point(550, 80),
                .Size = New Size(75, 36)
            }
            AddHandler btnSavePath.Click, AddressOf OnSavePath
            Controls.Add(btnSavePath)

            ' Password change section
            txtOldPwd = New MaterialTextBox2() With {
                .Hint = "Old Password",
                .UseSystemPasswordChar = True,
                .Location = New Point(30, 150),
                .Size = New Size(300, 48)
            }
            Controls.Add(txtOldPwd)

            txtNewPwd = New MaterialTextBox2() With {
                .Hint = "New Password",
                .UseSystemPasswordChar = True,
                .Location = New Point(30, 210),
                .Size = New Size(300, 48)
            }
            Controls.Add(txtNewPwd)

            txtConfirmPwd = New MaterialTextBox2() With {
                .Hint = "Confirm New",
                .UseSystemPasswordChar = True,
                .Location = New Point(30, 270),
                .Size = New Size(300, 48)
            }
            Controls.Add(txtConfirmPwd)

            btnChangePwd = New MaterialButton() With {
                .Text = "Change Password",
                .Location = New Point(350, 210),
                .Size = New Size(150, 36)
            }
            AddHandler btnChangePwd.Click, AddressOf OnChangePassword
            Controls.Add(btnChangePwd)

            ' Management buttons
            btnViewLog = New MaterialButton() With {
                .Text = "View Log",
                .Location = New Point(30, 340),
                .Size = New Size(120, 36)
            }
            AddHandler btnViewLog.Click, AddressOf OnViewLog
            Controls.Add(btnViewLog)

            btnExportJournal = New MaterialButton() With {
                .Text = "Export Journal",
                .Location = New Point(160, 340),
                .Size = New Size(140, 36)
            }
            AddHandler btnExportJournal.Click, AddressOf OnExportJournal
            Controls.Add(btnExportJournal)

            btnExportKey = New MaterialButton() With {
                .Text = "Export Root Key",
                .Location = New Point(310, 340),
                .Size = New Size(140, 36)
            }
            AddHandler btnExportKey.Click, AddressOf OnExportKey
            Controls.Add(btnExportKey)

            btnWipeData = New MaterialButton() With {
                .Text = "Wipe Data",
                .Location = New Point(460, 340),
                .Size = New Size(100, 36)
            }
            AddHandler btnWipeData.Click, AddressOf OnWipeData
            Controls.Add(btnWipeData)

            ' Theme toggle
            chkDarkMode = New MaterialCheckbox() With {
                .Text = "Dark Mode",
                .Location = New Point(30, 420)
            }
            AddHandler chkDarkMode.CheckedChanged, AddressOf OnToggleTheme
            Controls.Add(chkDarkMode)
        End Sub

        ' Event handler stubs
        Private Sub OnBrowsePath(sender As Object, e As EventArgs)
            ' TODO: implement browse logic
        End Sub

        Private Sub OnSavePath(sender As Object, e As EventArgs)
            ' TODO: save path logic
        End Sub

        Private Sub OnChangePassword(sender As Object, e As EventArgs)
            ' TODO: change password logic
        End Sub

        Private Sub OnViewLog(sender As Object, e As EventArgs)
            ' TODO: view log logic
        End Sub

        Private Sub OnExportJournal(sender As Object, e As EventArgs)
            ' TODO: export journal logic
        End Sub

        Private Sub OnExportKey(sender As Object, e As EventArgs)
            ' TODO: export key logic
        End Sub

        Private Sub OnWipeData(sender As Object, e As EventArgs)
            ' TODO: wipe data logic
        End Sub

        Private Sub OnToggleTheme(sender As Object, e As EventArgs)
            ' TODO: toggle theme logic
        End Sub
    End Class
End Namespace

