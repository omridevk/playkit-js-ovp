import { h, Component } from "preact";

export interface Props {

}

interface State {
    isLoading: boolean;
    hasError: boolean;
    cuepointsCount: number | null; // for demonstration only - can be removed
}

export default class Shared extends Component<Props, State> {



    render() {
        return (<div>
            {pluginName} is working.
        </div>)
    }
}
