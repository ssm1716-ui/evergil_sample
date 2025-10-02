import { useState } from 'react';
import Button from '@/components/common/Button/Button';

const AddressSearch = ({ onComplete, children }) => {
  const [address1, setAddress] = useState('');
  const [zipcode, setZipcode] = useState(''); // 우편번호 상태 추가

  const handleOpenPostcode = () => {
    const width = 500; // 팝업창 가로 크기
    const height = 600; // 팝업창 세로 크기
    const left = window.screen.width / 2 - width / 2; // 중앙 정렬
    const top = window.screen.height / 2 - height / 2; // 중앙 정렬

    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress
              ? `, ${data.buildingName}`
              : data.buildingName;
          }
          fullAddress += extraAddress ? ` (${extraAddress})` : '';
        }

        setAddress(fullAddress);
        setZipcode(data.zonecode); // 우편번호 저장

        if (onComplete)
          onComplete({ zipcode: data.zonecode, address1: fullAddress });
      },
      popupName: 'postcodePopup',
    }).open({
      left,
      top,
      width,
      height,
    });
  };

  return (
    <>
      <Button
        color="black"
        size="large"
        className="col-3 btn w-40 md-w-40 btn-round-edge md-py-0"
        onClick={handleOpenPostcode}
      >
        {children}
      </Button>
    </>
  );
};

export default AddressSearch;
