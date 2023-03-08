
<div align="center">
<img src="images/SignalRGB-Tools-Logo.png" width="20%" />
</div>



<br>
<div align="center">
<p>
  Signal-Tools uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>
</div>

<br>


## Starting Development Yourself


### Setting up development environment

First we need to setup the C# services, for this navigate to the following directory:
```bash
cd core/Core
```

In there run the following command to publish the app and get it ready for use with electron:

```bash
dotnet publish -c Release -r win10-x64
```
The above steps always need to be repeated after making a change to the c# services.

After this we will run the following line to install all node modules:
```bash
npm i
```

### Running the app
After following the setup steps above the app can be run by the following command:
```bash
npm run
```

## Packaging for Production

To package apps the app as exe run:

```bash
npm run package
```
