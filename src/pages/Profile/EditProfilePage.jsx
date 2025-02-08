import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postSignIn, getAccessToken } from '@/api/memberApi';
import { loginSuccess } from '@/state/slices/authSlices.js';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { isValidEmail } from '@/utils/validators';

import checkCircle from '@/assets/images/check-circle-solid.png';

const EditProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileType = (e) => {
    const el = e.currentTarget;
    el.classList.add('btn-black');
    el.classList.remove('btn-white-profile-type');
  };

  return (
    <section>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center overflow-hidden">
          <div className="col contact-form-style-04">
            <div className="pt-15 text-center">
              <div className="pb-15">
                <h3 className="fw-600 text-dark-gray mb-8 ls-minus-1px">
                  프로필 에디터 설정
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfilePage;
