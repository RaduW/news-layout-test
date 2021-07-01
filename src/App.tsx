import React, {useState} from 'react'
import './App.scss'

type ElementType = "article" | "sports" | "important" | "ad" | "references"

interface DisplayElement {
    type: ElementType
    id: string
}

interface AppState {
    columns: number
    elements: DisplayElement[]

}

function initialAppState(): AppState {

    const elements = new Array<DisplayElement>(40).fill({type: "article", id: ""}).map(
        (elm, idx) => {
            return {type: "article", id: `${idx + 1}`} as DisplayElement
        }
    )
    return {
        columns: 3,
        elements
    }
}

export function App() {
    const [state, setState]: [AppState, (state: AppState) => void] = useState(initialAppState());
    const setColumns = (columns: number) => setState({...state, columns})
    return (
        <div className="App">
            <Toolbar columns={state.columns} setColumns={setColumns}/>
            <ControlPanel elements={state.elements}/>
            <GridPanel {...state}/>
        </div>
    )
}

interface ControlPanelProps {
    elements: DisplayElement[]
}

function ControlPanel(props: ControlPanelProps) {
    const elements = props.elements.map((elm) =>
        <ElementController elm={elm}/>
    )
    return (<div className="ControlPanel">
        {elements}
    </div>)
}

interface GridPanelProps {
    columns: number
    elements: DisplayElement[]
}

function GridPanel(props: GridPanelProps) {
    const elements = props.elements.map((elm) => GridItem(elm))

    const numCols = props.columns;
    const gridType = numCols === 3 ? "three-columns" : numCols === 2 ? "two-columns" : "one-column";
    return (<div className="GridPanel">
        <div className={`the-grid ${gridType}`}>
            {elements}
        </div>
    </div>)
}

function GridItem(props: DisplayElement) {
    return (<div className={`item ${props.type}`}>
        {`${props.id} ${props.type}`}
    </div>)
}

interface ToolbarProps {
    columns: number
    setColumns: (val: number) => void
}

function Toolbar(props: ToolbarProps) {
    return (
        <div className="Toolbar">
            <span> </span>
            <ColumnsButton num_columns={1} current_setting={props.columns} reset_column={col => props.setColumns(col)}/>
            <ColumnsButton num_columns={2} current_setting={props.columns} reset_column={col => props.setColumns(col)}/>
            <ColumnsButton num_columns={3} current_setting={props.columns} reset_column={col => props.setColumns(col)}/>
        </div>
    )
}

interface ColumnsButtonProps {
    num_columns: number
    current_setting: number
    reset_column: (column: number) => void
}

function ColumnsButton(props: ColumnsButtonProps) {
    const is_active = props.num_columns === props.current_setting ? "active" : ""
    const set_column = () => props.reset_column(props.num_columns)

    return (
        <span className={`button ${is_active}`} onClick={(_) => set_column()}> {props.num_columns} </span>
    )
}

interface ElementControllerProps {
    elm: DisplayElement
}

function ElementController(props: ElementControllerProps) {
    const art_active = props.elm.type === 'article' ? "active" : ""
    const sp_active = props.elm.type === 'sports' ? "active" : ""
    const imp_active = props.elm.type === 'important' ? "active" : ""
    const ad_active = props.elm.type === 'ad' ? "active" : ""
    const ref_active = props.elm.type === 'references' ? "active" : ""
    return (
        <div className='button-container'>
            <span className="item-name">{props.elm.id}</span>
            <span className={`small-button ${art_active}`}>art</span>
            <span className={`small-button ${sp_active}`}>sp</span>
            <span className={`small-button ${imp_active}`}>imp</span>
            <span className={`small-button ${ad_active}`}>ad</span>
            <span className={`small-button ${ref_active}`}>ref</span>
        </div>
    )
}