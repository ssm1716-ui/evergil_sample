import Label from '@/components/common/Label/Label';
import Button from '@/components/common/Button/Button';

const TextPage = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <div className="p-5">
        <Label />
      </div>
      <div className="p-5 row row-cols-1 justify-content-center">
        <div className="pb-1 col btn-dual text-center">
          <Button variant="primary" size="extra-large" onClick={handleClick}>
            Button
          </Button>
          <Button variant="primary" size="large" onClick={handleClick}>
            Button
          </Button>
          <Button variant="primary" size="medium" onClick={handleClick}>
            Button
          </Button>
          <Button variant="primary" size="small" onClick={handleClick}>
            Button
          </Button>
          <Button variant="primary" size="very-small" onClick={handleClick}>
            Button
          </Button>
        </div>
        <div className="col btn-dual text-center">
          <Button
            variant="primary"
            size="extra-large"
            radiusOn="radius-on"
            onClick={handleClick}
          >
            Button
          </Button>
          <Button
            variant="primary"
            size="large"
            radiusOn="radius-on"
            onClick={handleClick}
          >
            Button
          </Button>
          <Button
            variant="primary"
            size="medium"
            radiusOn="radius-on"
            onClick={handleClick}
          >
            Button
          </Button>
          <Button
            variant="primary"
            size="small"
            radiusOn="radius-on"
            onClick={handleClick}
          >
            Button
          </Button>
          <Button
            variant="primary"
            size="very-small"
            radiusOn="radius-on"
            onClick={handleClick}
          >
            Button
          </Button>
        </div>
        <div className="p-5 row row-cols-1 justify-content-center">
          <div className="pb-1 col btn-dual text-center">
            <Button
              variant="primary"
              color="white"
              size="extra-large"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="large"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="medium"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="small"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="very-small"
              onClick={handleClick}
            >
              Button
            </Button>
          </div>
          <div className="col btn-dual text-center">
            <Button
              variant="primary"
              color="white"
              size="extra-large"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="large"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="medium"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="small"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="very-small"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
          </div>
        </div>

        <div className="p-5 row row-cols-1 justify-content-center">
          <div className="pb-1 col btn-dual text-center">
            <Button variant="primary" color="profile" size="extra-large">
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="large"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="medium"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="small"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="very-small"
              onClick={handleClick}
            >
              Button
            </Button>
          </div>
          <div className="col btn-dual text-center">
            <Button
              variant="primary"
              color="white"
              size="extra-large"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="large"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="medium"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="small"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
            <Button
              variant="primary"
              color="white"
              size="very-small"
              radiusOn="radius-on"
              onClick={handleClick}
            >
              Button
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextPage;
