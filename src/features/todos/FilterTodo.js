import PropTypes from 'prop-types';
const FilterTodo = ({ onFilter, filter }) => {
    let { btnClassAll, btnClassTodo, btnClassCompleted } = getBtnClass(filter);
    return (
        <div className='row d-flex btn-d'>
            <div className='col-sm-4'>
                <button
                    disabled={filter === 'ALL'}
                    onClick={() => onFilter('ALL')}
                    className={btnClassAll}>
                    ALL
                </button>
            </div>
            <div className='col-sm-4'>
                <button
                    disabled={filter === 'TODO'}
                    onClick={onFilter.bind(null, 'TODO')}
                    className={btnClassTodo}>
                    T O DO
                </button>
            </div>
            <div className='col-sm-4'>
                <button
                    disabled={filter === 'COMPLETED'}
                    onClick={onFilter.bind(null, 'COMPLETED')}
                    className={btnClassCompleted}>
                    COMPLETED
                </button>
            </div>
        </div>
    );
};
FilterTodo.propTypes = {
    onFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
};
export default FilterTodo;
function getBtnClass(filter) {
    let btnClassAll = 'btn w-100 btn-outline-success';
    let btnClassTodo = 'btn w-100 btn-outline-success';
    let btnClassCompleted = 'btn w-100 btn-outline-success';
    switch (filter) {
        case 'ALL':
            btnClassAll = btnClassAll.replace(
                'btn-outline-success',
                'btn-outline-info'
            );
            break;
        case 'TODO':
            btnClassTodo = btnClassTodo.replace(
                'btn-outline-success',
                'btn-outline-info'
            );
            break;
        case 'COMPLETED':
            btnClassCompleted = btnClassCompleted.replace(
                'btn-outline-success',
                'btn-outline-info'
            );
            break;
        default:
            break;
    }
    return { btnClassAll, btnClassTodo, btnClassCompleted };
}
