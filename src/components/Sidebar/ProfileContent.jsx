import React from 'react';

const ProfileContent = () => {
    return (
        <div className="profile_content">
            <div className="profile">
                <div className="profile_details">
                    <img src="../static/images/profilepicture.jpg" alt="Profile Picture"/>
                    <div className="usuario_cargo">
                        <div className="usuario">Nome Usuário</div>
                        <div className="cargo">Cargo Usuário</div>
                    </div>
                </div>
                <i className='bx bx-log-out' id="log_out"></i>
            </div>
        </div>
    );
}

export default ProfileContent;
