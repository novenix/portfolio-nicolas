import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import {renderMark} from './renderers/index';
// import HoverMenu from './HoverMenu'
import {HoverMenu} from './components'

// Create our initial value...
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.',
          },
        ],
      },
    ],
  },
})
// Define a React component renderer for our code blocks.
function CodeNode(props) {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }
  // Define a React component to render bold text with.
    function BoldMark(props) {
        return <strong>{props.children}</strong>
    }
export default class SlateEditor extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
      //value: initialValue,
      value: Value.fromJSON(initialValue),
      isLoaded:false,
    }
    componentDidMount(){
        this.updateMenu();
        this.setState({isLoaded:true})
    }

    componentDidUpdate = () => {
        this.updateMenu();
      }
    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        
      this.setState({ value })
    }
    menuRef = React.createRef()
    updateMenu = () => {
        const menu = this.menuRef.current
        if (!menu) return
    
        const { value } = this.state
        const { fragment, selection } = value
    
        if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
          menu.removeAttribute('style')
          return
        }
    }
      

    // Render the editor.
    render() {
        const {isLoaded}=this.state;
        return (
        <React.Fragment>
            
         {isLoaded&&
            <Editor placeholder="Enter some text..."
                     value={this.state.value}
                     onChange={this.onChange}
                     renderMark={renderMark}
                     renderEditor={this.renderEditor}
                     />
         }
     </React.Fragment>)
    }
    renderEditor = (props, editor, next) => {
        const children = next()
        return (
          <React.Fragment>
            {children}
            <HoverMenu ref={this.menuRef} editor={editor} />
          </React.Fragment>
        )
      }
  }