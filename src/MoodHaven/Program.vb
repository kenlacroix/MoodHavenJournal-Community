Imports System
Imports System.IO
Imports System.Windows.Forms
Imports MoodHaven.UI
Imports MoodHavenJournal_Core.Services
Imports MoodHavenJournal_Core.Models

Module Program
    <STAThread>
    Sub Main()
        Application.EnableVisualStyles()
        Application.SetCompatibleTextRenderingDefault(False)

        Dim encSvc As New EncryptionService()

        If Not SaltService.SaltExists() Then
            Using wizard As New FirstRunForm()
                wizard.ShowDialog()
                If wizard.WasCancelled Then Return

                Application.Run(New MainForm(wizard.SelectedPath, encSvc, wizard.DerivedRootKey))
            End Using
        Else
            Dim saltData As SaltService.SaltData = SaltService.LoadSalt()
            If saltData Is Nothing Then
                MessageBox.Show("Salt file is missing or corrupt.", "Startup Error", MessageBoxButtons.OK, MessageBoxIcon.Error)
                Return
            End If

            Dim loginForm As New LoginForm("User")
            If loginForm.ShowDialog() <> DialogResult.OK Then Return

            Dim password As String = loginForm.EnteredPassword
            Dim saltBytes As Byte() = Convert.FromBase64String(saltData.Salt)
            Dim derivedKey As Byte() = encSvc.DeriveKey(password, saltBytes, 100_000)

            If Not SaltService.VerifyPassword(derivedKey) Then
                MessageBox.Show("Incorrect password.", "Login Failed", MessageBoxButtons.OK, MessageBoxIcon.Error)
                Return
            End If

            Dim profile As UserProfile = UserProfileService.LoadProfile(encSvc, derivedKey)
            If profile Is Nothing Then
                MessageBox.Show("Failed to load user profile.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error)
                Return
            End If

            Dim appDataPath As String = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "MoodBloom")
            Application.Run(New MainForm(appDataPath, encSvc, derivedKey))
        End If
    End Sub
End Module
