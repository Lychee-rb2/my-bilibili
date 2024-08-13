import * as ReactDOM from 'react-dom/client';

function Root() {
  return <form onSubmit={e => {
    e.preventDefault()
    console.log(e)
  }}>
    <label>
      <span>site:</span>
      <input name="site:"/>
    </label>
    <button>Check</button>
  </form>
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Root/>)
