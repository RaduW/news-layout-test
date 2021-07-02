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

function getSavedAppState(): AppState | null {
    const savedStr = window.localStorage.getItem("elements-map")
    if (savedStr) {
        try {
            return JSON.parse(savedStr) as AppState
        } catch {
            return null
        }
    }
    return null
}

function saveAppState(state:AppState) {
    window.localStorage.setItem("elements-map", JSON.stringify(state))
}

function initialAppState(): AppState {
    const savedState = getSavedAppState()
    if( savedState){
        return savedState
    }
    const elements = new Array<DisplayElement>(70).fill({type: "article", id: ""}).map(
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
    const setColumns = (columns: number) => {
        const newState =  {...state, columns}
        saveAppState(newState)
        setState(newState)
    }
    const setElementType = (idx: number, type: ElementType) => {
        let elements = [...state.elements]
        elements[idx] = {...elements[idx], type}
        const newState = {...state, elements}
        saveAppState(newState)
        setState(newState)
    }
    return (
        <div className="App">
            <Toolbar columns={state.columns} setColumns={setColumns}/>
            <ControlPanel elements={state.elements} setElementType={setElementType}/>
            <GridPanel {...state}/>
        </div>
    )
}

interface ControlPanelProps {
    elements: DisplayElement[]
    setElementType: (idx: number, type: ElementType) => void
}

function ControlPanel(props: ControlPanelProps) {
    const setElement = (idx: number) => (type: ElementType) => {
        props.setElementType(idx, type)
        //props.elements[idx] = {...props.elements[idx], type}
    }
    const elements = props.elements.map((elm, idx) =>
        <ElementController key={idx} elm={elm} setType={setElement(idx)}/>
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
    return (<div className={`item ${props.type}`} key={props.id}>
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
    setType: (elementType: ElementType) => void
}

function ElementController(props: ElementControllerProps) {
    const art_active = props.elm.type === 'article' ? "active" : ""
    const sp_active = props.elm.type === 'sports' ? "active" : ""
    const imp_active = props.elm.type === 'important' ? "active" : ""
    const ad_active = props.elm.type === 'ad' ? "active" : ""
    const ref_active = props.elm.type === 'references' ? "active" : ""
    return (
        <div className='button-container'>
            <span className="item-name" onClick={(_) => props.setType("article")}>{props.elm.id}</span>
            <span className={`small-button ${art_active} article`} onClick={(_) => props.setType("article")}>art</span>
            <span className={`small-button ${sp_active} sports`} onClick={(_) => props.setType("sports")}>sp</span>
            <span className={`small-button ${imp_active} important`}
                  onClick={(_) => props.setType("important")}>imp</span>
            <span className={`small-button ${ad_active} ad`} onClick={(_) => props.setType("ad")}>ad</span>
            <span className={`small-button ${ref_active} references`}
                  onClick={(_) => props.setType("references")}>ref</span>
        </div>
    )
}