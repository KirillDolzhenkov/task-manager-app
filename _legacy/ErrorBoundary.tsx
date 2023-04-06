import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    //catch errors anywhere in child component tree:
    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    //show errors info:
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(" Logging to external log service ...", error, errorInfo);
    }

    public render() {
        return this.state.hasError
            ? <h1>Something went wrong</h1>
            : this.props.children
    }
}

export {
    ErrorBoundary
}

