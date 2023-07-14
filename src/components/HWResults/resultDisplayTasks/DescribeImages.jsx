import { API } from '../../../helpers/consts';

import './resultDisplayTasks.css';

const Images = ({ answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    return (
        <div className="rdt-images-image-box-wrapper">
            {answer.images.map(({ image }, index) => {
                return (
                    <div className="images-image-box" key={image}>
                        <img src={`${API}${image}`} alt="exercise" />
                        <p>
                            {index + 1}. {answers[index]}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Images;
