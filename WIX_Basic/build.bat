candle.exe *.wxs -o obj\
light.exe obj\Product.wixobj -ext WixUIExtension -o bin\MyInstaller.msi
insignia -im bin\MyInstaller.msi 