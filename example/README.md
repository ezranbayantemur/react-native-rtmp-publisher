# Example Project

Clone the repo and run

```sh
yarn
```
and

```sh
cd example && yarn ios (or yarn android)
```
You can specify your streaming URL's on the `App.tsx` file.
```tsx
...
...
import MicrophoneSelectModal from './components/MicrophoneSelectModal';

const STREAM_URL = 'YOUR_STREAM_URL'; // ex: rtmp://a.rtmp.youtube.com/live2
const STREAM_NAME = 'YOUR_STREAM_NAME'; // ex: abcd-1234-abcd-1234-abcd

export default function App() {
...
...
```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
