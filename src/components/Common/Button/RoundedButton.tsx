import * as S from './styles';

interface IRoundedButtonProps {
  label?: string;
  outline?: boolean;
  background?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  textColor?: string;
  widthSize?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const RoundedButton = ({
  label,
  outline,
  onClick,
  background,
  type,
  textColor,
  widthSize,
  disabled = false
}: IRoundedButtonProps) => {
  return (
    <>
      {!outline ? (
        <S.RoundedButton
          onClick={() => (onClick ? onClick() : undefined)}
          background={background}
          textColor={textColor}
          type={type}
        >
          {label}
        </S.RoundedButton>
      ) : (
        <S.OutlineRoundedButton disabled={disabled} onClick={() => (onClick ? onClick() : undefined)} background={background} type={type}>
          {label}
        </S.OutlineRoundedButton>
      )}
    </>
  );
};
