import {
    useDevbook,
    DevbookStatus,
} from '@devbookhq/sdk'



function DevbookVM({structureCode, styleCode, functionCode}) {
    // Compile code together
    // Use the hook
    // Get your VM ID by creating a new VM via Devbook CLI - https://github.com/devbookhq/devbookctl
    const { stdout, stderr, status, fs, runCmd } = useDevbook({ env: 'hello-children', config: { domain: 'shared.usedevbook.com' } })
  
    async function handleRun() {
      if (status !== DevbookStatus.Connected) return
      if (!fs) return
  
      // 4. Manipulate the filesystem
    //   await fs.write('/temp.js', compileCode(structureCode, styleCode, functionCode))
      await fs.write('/temp.js', '<h1>HI</h1><script>console.log("Hello");</script>')
      // 5. Execute the code
      await runCmd(`node ./temp.js`)
    }
  
    return (
      <div>
        {status === DevbookStatus.Disconnected && <div>Status: Disconnected, will start VM</div>}
        {status === DevbookStatus.Connecting && <div>Status: Starting VM...</div>}
        {status === DevbookStatus.Connected && <button onClick={handleRun}>Run</button>}
        <h3>Output</h3>
        {stdout.map((o, idx) => <span key={`out_${idx}`}>{o}</span>)}
        {stderr.map((e, idx) => <span key={`err_${idx}`}>{e}</span>)}
      </div>
    )
  }
  
  export default DevbookVM
  