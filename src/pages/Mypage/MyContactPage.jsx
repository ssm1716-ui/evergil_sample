import ContactComponents from '@/components/Contact/ContactComponents';

const MyContactPage = () => {
  return (
    <>
      <div className="col-xxl-10 col-lg-9 md-ps-15px md-mb-60px ">
        <div className="col-12 col-xl-12 col-lg-12 text-start position-relative page-title-extra-large text-decoration-line-bottom mb-3">
          <h1 className="fw-600 text-dark-gray mb-10px">문의 하기</h1>
        </div>
        <section className="p-0">
          <div className="pt-1 text-black">
            <ContactComponents />
          </div>
        </section>
      </div>
    </>
  );
};

export default MyContactPage;
