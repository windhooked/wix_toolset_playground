https://stackoverflow.com/questions/23909962/is-it-possible-to-automatically-download-prerequisites-using-wix-bootstrapper
https://helgeklein.com/blog/2014/09/real-world-example-wix-msi-application-installer/#wixui_hk-wxs
https://stackoverflow.com/questions/54524485/configure-a-wix-installer-to-use-different-user-credentials-depending-of-the-env

https://stackoverflow.com/questions/9188274/vs-2010-bootstrapper-for-wic-windows-imaging-component-before-net-4-installat

https://www.add-in-express.com/creating-addins-blog/2014/02/07/add-custom-dialogs-wix-installer/

https://stackoverflow.com/questions/471424/wix-tricks-and-tips

https://stackoverflow.com/questions/52344035/wix-installer-with-modern-look-and-feel

https://html.developreference.com/article/15992593/Using+WiX+to+install+a+Node+server+as+a+Windows+Service

https://github.com/deepak-rathi/Wix-Setup-Samples

https://wixtoolset.org/documentation/manual/v3/overview/insignia.html

Puts an executable and a config file in %ProgramFiles%
Installs and starts a Windows system service
Custom dialog asks for a server name and adds that to the config file
Install location and custom server name are persisted across upgrades
Install location and server name can be specified on the msiexec command line
Displays a license agreement in RTF format
Easily localizable (including the license agreement), all relevant strings in per-language WXL files
Uses the upgrade logic introduced with WiX 3.5
Prevents multiple installations of the same product (same or different versions)
Checks for a minimum required OS version
Checks to prevent installing the 32-bit version on a 64-bit OS and vice versa