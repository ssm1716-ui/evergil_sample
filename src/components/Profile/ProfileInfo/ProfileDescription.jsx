import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// ReactQuill 설정
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
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'script',
  'indent',
  'color',
  'background',
  'align',
];

const ProfileDescription = ({
  content,
  setContent,
  pageMode,
  isOwner,
  isEditor,
  profileId,
  profileNickname,
  onBlur,
  profile,
  saveDescription,
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempContent, setTempContent] = useState(content || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const quillEditRef = useRef(null);      // Edit 모드 에디터
  const quillEditViewRef = useRef(null);  // Edit 모드 표시
  const quillViewRef = useRef(null);      // View 모드

  const MAX_CONTENT_LENGTH = 500;
  const PREVIEW_LENGTH = 150;

  const canEdit = pageMode === 'edit';

  const getTextLength = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]*>?/gm, '');
    return text.length;
  };

  const getPlainText = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  };

  useEffect(() => {
    setTempContent(content || '');
  }, [content]);

  const handleDescriptionClick = () => {
    if (canEdit && !isEditingBio) {
      setTempContent(content || '');
      setIsEditingBio(true);
    }
  };

  const handleEditorChange = (value, delta, source, editor) => {
    const textContent = editor.getText();
    const textLength = textContent.length - 1;
    
    if (textLength <= MAX_CONTENT_LENGTH) {
      setTempContent(value);
    } else {
      const trimmedText = textContent.substring(0, MAX_CONTENT_LENGTH);
      editor.setText(trimmedText);
    }
  };

  const handleSave = async () => {
    setContent(tempContent);
    setIsEditingBio(false);
    
    if (tempContent.trim() !== '' && saveDescription) {
      try {
        await saveDescription(tempContent);
      } catch (error) {
        console.error('저장 중 오류:', error);
        alert('저장 중 오류가 발생했습니다: ' + error.message);
      }
    }
  };

  const plainText = getPlainText(profile.description || content || '');
  const hasContent = plainText.trim().length > 0;
  const shouldShowExpandButton = plainText.length > PREVIEW_LENGTH;

  // Edit 모드 + 에디터 활성화 상태
  if (pageMode === 'edit' && isEditingBio) {
    const currentLength = getTextLength(tempContent);
    
    return (
      <section className="pb-0 description-section-edit">
        <div className="container">
          <div className="row d-flex flex-column">
            <div className="xs-mt-25px d-flex justify-content-center">
              <div className="description-editor-container" style={{ width: '100%' }}>
                <ReactQuill
                  ref={quillEditRef}
                  theme="snow"
                  value={tempContent}
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                  style={{ 
                    width: '100%',
                  }}
                  className="lh-initial"
                  placeholder="추모글을 작성해주세요..."
                />
                <div className={`description-char-counter ${currentLength > MAX_CONTENT_LENGTH * 0.9 ? 'warning' : ''}`}>
                  추모글은 최대 {MAX_CONTENT_LENGTH}자까지 작성 가능합니다. <strong>({currentLength}/{MAX_CONTENT_LENGTH})</strong>
                </div>
              </div>
            </div>

            <div className="description-save-container">
              <button
                className="description-save-button"
                onClick={handleSave}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Edit 모드 + 일반 표시 상태
  if (pageMode === 'edit') {
    return (
      <section className="pb-5 description-section-view">
        <div className="container">
          <div
            className="description-clickable"
            onClick={handleDescriptionClick}
            role="button"
            tabIndex={0}
          >
            {hasContent ? (
              <div className="description-content">
                {shouldShowExpandButton && !isExpanded ? (
                  <>
                    <div className="description-preview">
                      {plainText.substring(0, PREVIEW_LENGTH)}...
                    </div>
                    <button 
                      className="description-expand-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(true);
                      }}
                    >
                      더보기
                    </button>
                  </>
                ) : (
                  <>
                    <div className="col col-sm-12 offset-md-0 fs-20 md-ps-25px sm-ps-0 sm-mt-20px custom-quill-wrapper">
                      <ReactQuill
                        ref={quillEditViewRef}
                        className="w-100"
                        value={content || profile.description}
                        readOnly={true}
                        theme="snow"
                        modules={{ toolbar: false }}
                      />
                    </div>
                    {shouldShowExpandButton && (
                      <button 
                        className="description-expand-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(false);
                        }}
                      >
                        접기
                      </button>
                    )}
                  </>
                )}
                <div className="description-hint">
                  (클릭하여 수정)
                </div>
              </div>
            ) : (
              <div className="description-placeholder">
                추모글을 작성해보세요
                <div className="description-hint">
                  (클릭하여 작성)
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // View 모드 - 읽기 전용
  // 🔥 수정: 내용이 없어도 최소 공간 유지
  if (pageMode === 'view') {
    if (hasContent) {
      return (
        <section className="pb-5 description-section-view">
          <div className="container">
            <div className="description-content">
              {shouldShowExpandButton && !isExpanded ? (
                <>
                  <div className="description-preview">
                    {plainText.substring(0, PREVIEW_LENGTH)}...
                  </div>
                  <button 
                    className="description-expand-button"
                    onClick={() => setIsExpanded(true)}
                  >
                    더보기
                  </button>
                </>
              ) : (
                <>
                  <div className="col col-sm-12 offset-md-0 fs-20 md-ps-25px sm-ps-0 sm-mt-20px custom-quill-wrapper">
                    <ReactQuill
                      ref={quillViewRef}
                      className="w-100"
                      value={content || profile.description}
                      readOnly={true}
                      theme="snow"
                      modules={{ toolbar: false }}
                    />
                  </div>
                  {shouldShowExpandButton && (
                    <button 
                      className="description-expand-button"
                      onClick={() => setIsExpanded(false)}
                    >
                      접기
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      );
    } else {
      // 🔥 추모글 없어도 최소 공간 확보 (버튼이 이미지와 겹치지 않도록)
      return (
        <section className="pb-5 description-section-view" style={{ minHeight: '50px' }}>
          {/* 빈 공간 유지 */}
        </section>
      );
    }
  }

  return null;
};

export default ProfileDescription;