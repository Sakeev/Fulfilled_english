import React from 'react';

const TeacherEssayPage = () => {
    return (
        <div style={container}>
            <div style={headers}>
                <h2 style={{ width: '40%' }}>Students</h2>
                <h2>Progress</h2>
            </div>
            {studentsList?.map((student, index) => (
                <div style={studentRow} key={index}>
                    <div style={{ width: '40%' }}>
                        {student.first_name} {student.last_name}
                    </div>
                    <div
                        style={{
                            backgroundColor: '#9bd0cb',
                            width: '25%',
                            borderRadius: '10px',
                            position: 'relative',
                        }}
                    >
                        <span
                            style={{
                                color: 'white',
                                fontSize: '15px',
                                alignItems: 'center',
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            25 %
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                width: '25%',
                                height: '100%',
                                borderRadius: '10px',
                                backgroundColor: '#E29578',
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeacherEssayPage;
