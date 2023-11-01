import "./index.css";

export default function Component({title, info}) {
    return (
    <div className="heading">
        <h1>{title}</h1>
        <div className="info">{info}</div>
    </div>
);
}
