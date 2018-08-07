del /q ..\server\public\dist\
xcopy .\dist\build.js ..\server\public\dist\
xcopy .\dist\0.build.js ..\server\public\dist\
xcopy .\dist\1.build.js ..\server\public\dist\
node ..\server\server.js