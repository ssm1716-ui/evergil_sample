import { useEffect, useState } from 'react';
import { getPolicySelected } from '@/api/policy/policyApi';

const TermsPage = () => {
  const [termContent, setTermContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        const response = await getPolicySelected('service');
        if (response.data && response.data.data && response.data.data.content) {
          setTermContent(response.data.data.content);
          setError(null);
        } else {
          throw new Error('약관 내용을 찾을 수 없습니다.');
        }
      } catch (err) {
        setError('약관 내용을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (isLoading) {
    return (
      <section className="sm-mt-60px">
        <div className="text-center">로딩중...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sm-mt-60px">
        <div className="text-center text-danger">{error}</div>
      </section>
    );
  }

  return (
    <section className="sm-mt-60px">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-30px pt-20px sm-pt-10px">
              <h2 className="fw-500 text-dark-gray mb-15px fs-24 sm-fs-20">이용약관</h2>
              <div className="separator-line-horrizontal-medium-light2 bg-medium-gray d-table mx-auto w-100px sm-w-80px"></div>
            </div>
            <div
              className="bg-white p-30px sm-p-20px border-radius-6px box-shadow-medium"
              style={{
                overflow: 'auto',
                lineHeight: '1.8',
                fontSize: '15px',
                color: '#333',
              }}
            >
              <div 
                className="terms-content"
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  '@media (max-width: 767px)': {
                    fontSize: '14px',
                    lineHeight: '1.6',
                  }
                }}
                dangerouslySetInnerHTML={{ __html: termContent }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
