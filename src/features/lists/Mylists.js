import Lists from './Lists';

const Mylists = ({ lists }) => {
    return (
        <div>
            <h1>My lists</h1>
            <Lists lists={lists} />
        </div>
    );
};
export default Mylists;
