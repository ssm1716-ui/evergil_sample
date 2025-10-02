import React from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet',
  'script', 'indent', 'color', 'background', 'align',
];

const LetterModal = ({ 
  // 작성 모달
  isRegisterModalOpen,
  onRegisterModalClose,
  
  // 수정 모달
  isEditModalOpen,
  onEditModalClose,
  
  // 삭제 모달
  isDeleteModalOpen,
  onDeleteModalClose,
  
  // 하늘편지 데이터
  letter,
  onLetterChange,
  
  // 액션 핸들러
  onSendLetter,
  onUpdateLetter,
  onConfirmDelete
}) => {
  const handleLetterChange = (e) => {
    const { name, value } = e.target;
    onLetterChange(name, value);
  };

  const handleContentChange = (content) => {
    onLetterChange('content', content);
  };

  return (
    <>
      {/* 하늘편지 작성 모달 */}
      <Modal 
        isOpen={isRegisterModalOpen} 
        onClose={onRegisterModalClose}
        title="하늘편지 작성"
      >
        <div className="p-4">
          <div className="mb-3">
            <label className="form-label">보내는 사람</label>
            <input
              type="text"
              name="displayName"
              value={letter.displayName}
              onChange={handleLetterChange}
              className="form-control"
              placeholder="이름을 입력해주세요"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">편지 내용</label>
            <ReactQuill
              value={letter.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="마음을 담아 편지를 작성해주세요..."
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </div>
          
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={onRegisterModalClose}
            >
              취소
            </Button>
            <Button
              variant="primary"
              color="base-color"
              onClick={onSendLetter}
              disabled={!letter.displayName.trim() || !letter.content.trim()}
            >
              편지 보내기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 하늘편지 수정 모달 */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={onEditModalClose}
        title="하늘편지 수정"
      >
        <div className="p-4">
          <div className="mb-3">
            <label className="form-label">보내는 사람</label>
            <input
              type="text"
              name="displayName"
              value={letter.displayName}
              onChange={handleLetterChange}
              className="form-control"
              placeholder="이름을 입력해주세요"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">편지 내용</label>
            <ReactQuill
              value={letter.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="마음을 담아 편지를 작성해주세요..."
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </div>
          
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={onEditModalClose}
            >
              취소
            </Button>
            <Button
              variant="primary"
              color="base-color"
              onClick={onUpdateLetter}
              disabled={!letter.displayName.trim() || !letter.content.trim()}
            >
              수정 완료
            </Button>
          </div>
        </div>
      </Modal>

      {/* 하늘편지 삭제 확인 모달 */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={onDeleteModalClose}
        title="하늘편지 삭제"
      >
        <div className="p-4 text-center">
          <i className="feather icon-feather-alert-triangle text-warning fs-40 mb-3"></i>
          <h5 className="mb-3">정말 삭제하시겠습니까?</h5>
          <p className="text-muted mb-4">
            삭제된 하늘편지는 복구할 수 없습니다.
          </p>
          
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="secondary"
              onClick={onDeleteModalClose}
            >
              취소
            </Button>
            <Button
              variant="danger"
              onClick={onConfirmDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LetterModal;