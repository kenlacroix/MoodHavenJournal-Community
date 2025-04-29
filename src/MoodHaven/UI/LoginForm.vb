Imports System.Drawing
Imports System.Windows.Forms
Imports MaterialSkin
Imports MaterialSkin.Controls

Namespace UI
    Public Class LoginForm
        Inherits MaterialForm

        Private lblUsername As MaterialLabel
        Private txtPassword As MaterialTextBox2
        Private btnLogin As MaterialButton
        Private btnCancel As MaterialButton

        Private _password As String = String.Empty
        Public ReadOnly Property EnteredPassword As String
            Get
                Return _password
            End Get
        End Property

        Public Sub New(username As String)
            Dim manager As MaterialSkinManager = MaterialSkinManager.Instance
            manager.AddFormToManage(Me)
            manager.Theme = MaterialSkinManager.Themes.LIGHT
            manager.ColorScheme = New ColorScheme(
                Primary.Blue600, Primary.Blue900, Primary.Blue200, Accent.LightBlue200, TextShade.WHITE)

            InitializeComponent(username)
        End Sub

        Private Sub InitializeComponent(username As String)
            Me.Text = "Login to MoodBloom"
            Me.Size = New Size(400, 250)
            Me.StartPosition = FormStartPosition.CenterScreen
            Me.FormBorderStyle = FormBorderStyle.FixedDialog
            Me.MaximizeBox = False
            Me.MinimizeBox = False

            lblUsername = New MaterialLabel With {
                .Text = $"Welcome back, {username}",
                .Location = New Point(50, 80),
                .AutoSize = True
            }
            Controls.Add(lblUsername)

            txtPassword = New MaterialTextBox2 With {
                .Hint = "Password",
                .UseSystemPasswordChar = True,
                .Location = New Point(50, 110),
                .Size = New Size(300, 48)
            }
            Controls.Add(txtPassword)

            btnLogin = New MaterialButton With {
                .Text = "Login",
                .Location = New Point(180, 170),
                .Size = New Size(75, 36)
            }
            AddHandler btnLogin.Click, AddressOf OnLogin
            Controls.Add(btnLogin)

            btnCancel = New MaterialButton With {
                .Text = "Cancel",
                .Location = New Point(275, 170),
                .Size = New Size(75, 36)
            }
            AddHandler btnCancel.Click, AddressOf OnCancel
            Controls.Add(btnCancel)
        End Sub

        Private Sub OnLogin(sender As Object, e As EventArgs)
            If String.IsNullOrWhiteSpace(txtPassword.Text) Then
                MessageBox.Show("Please enter your password.", "Validation", MessageBoxButtons.OK, MessageBoxIcon.Warning)
                Return
            End If
            _password = txtPassword.Text
            Me.DialogResult = DialogResult.OK
            Me.Close()
        End Sub

        Private Sub OnCancel(sender As Object, e As EventArgs)
            _password = String.Empty
            Me.DialogResult = DialogResult.Cancel
            Me.Close()
        End Sub
    End Class
End Namespace
