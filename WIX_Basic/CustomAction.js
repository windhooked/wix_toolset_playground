//
// CustomActions.js 
// 
// Template for WIX Custom Actions written in Javascript.
//https://stackoverflow.com/questions/471424/wix-tricks-and-tips
// 
// 
// Mon, 23 Nov 2009  10:54
// 
// ===================================================================


// http://msdn.microsoft.com/en-us/library/sfw6660x(VS.85).aspx
var Buttons = {
        OkOnly           : 0,
        OkCancel         : 1,
        AbortRetryIgnore : 2,
        YesNoCancel      : 3
};

var Icons = {
        Critical         : 16,
        Question         : 32,
        Exclamation      : 48,
        Information      : 64
};

var MsgKind = {
        Error            : 0x01000000,
        Warning          : 0x02000000,
        User             : 0x03000000,
        Log              : 0x04000000
};

// http://msdn.microsoft.com/en-us/library/aa371254(VS.85).aspx
var MsiActionStatus = {
        None             : 0,
        Ok               : 1, // success
        Cancel           : 2,
        Abort            : 3,
        Retry            : 4, // aka suspend?
        Ignore           : 5  // skip remaining actions; this is not an error.
};


function MyCustomActionInJavascript_CA() {
    try {
        LogMessage("Hello from MyCustomActionInJavascript");
        // ...do work here...
        LogMessage("Goodbye from MyCustomActionInJavascript");
    }
    catch (exc1) {
        Session.Property("CA_EXCEPTION") = exc1.message ;
        LogException(exc1);
        return MsiActionStatus.Abort;
    }
    return MsiActionStatus.Ok;
}

// Pop a message box.  also spool a message into the MSI log, if it is enabled. 
function LogException(exc) {
    var record = Session.Installer.CreateRecord(0);
    record.StringData(0) = "CustomAction: Exception: 0x" + decimalToHexString(exc.number) + " : " + exc.message;
    Session.Message(MsgKind.Error + Icons.Critical + Buttons.btnOkOnly, record);
}


// spool an informational message into the MSI log, if it is enabled. 
function LogMessage(msg) {
    var record = Session.Installer.CreateRecord(0);
    record.StringData(0) = "CustomAction:: " + msg;
    Session.Message(MsgKind.Log, record);
}


// http://msdn.microsoft.com/en-us/library/d5fk67ky(VS.85).aspx
var WindowStyle = {
    Hidden : 0,
    Minimized : 1,
    Maximized : 2
};

// http://msdn.microsoft.com/en-us/library/314cz14s(v=VS.85).aspx
var OpenMode = {
    ForReading : 1,
    ForWriting : 2,
    ForAppending : 8
};

// http://msdn.microsoft.com/en-us/library/a72y2t1c(v=VS.85).aspx
var SpecialFolders = {
    WindowsFolder : 0, 
    SystemFolder :  1, 
    TemporaryFolder : 2
};

// Run a command via cmd.exe from within the MSI
function RunCmd(command)
{
    var wshell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var tmpdir = fso.GetSpecialFolder(SpecialFolders.TemporaryFolder);
    var tmpFileName = fso.BuildPath(tmpdir, fso.GetTempName());

    LogMessage("shell.Run("+command+")");

    // use cmd.exe to redirect the output
    var rc = wshell.Run("%comspec% /c " + command + "> " + tmpFileName, WindowStyle.Hidden, true);
    LogMessage("shell.Run rc = "  + rc);

    // here, optionally parse the output of the command 
    if (parseOutput) {
        var textStream = fso.OpenTextFile(tmpFileName, OpenMode.ForReading);
        while (!textStream.AtEndOfStream) {
            var oneLine = textStream.ReadLine();
            var line = ParseOneLine(oneLine);
                //...
        }
        textStream.Close();
    }

    if (deleteOutput) {
        fso.DeleteFile(tmpFileName);
    }

    return {
        rc : rc,
        outputfile : (deleteOutput) ? null : tmpFileName
    };
}