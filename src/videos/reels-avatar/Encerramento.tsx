import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {ARQ, COR, INTER, MONT, T, useMola, useT} from './tema';

// Tela final depois da última palavra: entra pelo wipe azul e fecha com o nome do perfil.
export const OUTRO = 1.4;

export const Encerramento: React.FC = () => {
  const t = useT(T.fim - 0.1);
  const mola = useMola();
  const icone = mola(t, T.fim + 0.08, 11, 170);
  const nome = mola(t, T.fim + 0.22);
  const arroba = mola(t, T.fim + 0.36);

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at 50% 40%, #0E2250 0%, #000 68%)',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}
    >
      <Img
        src={ARQ.logo}
        style={{
          width: 300, height: 300, borderRadius: 72, boxShadow: '0 30px 90px rgba(46,229,157,.25), 0 0 0 3px rgba(62,198,255,.35)',
          scale: String(icone), rotate: `${(1 - icone) * -20}deg`,
        }}
      />
      <div style={{marginTop: 50, fontFamily: MONT, fontWeight: 900, fontSize: 112, color: COR.branco, opacity: nome, translate: `0px ${(1 - nome) * 40}px`}}>
        Digo Social
      </div>
      <div style={{marginTop: 6, fontFamily: INTER, fontWeight: 700, fontSize: 56, color: COR.ciano, opacity: arroba, translate: `0px ${(1 - arroba) * 30}px`}}>
        @digo.social
      </div>
    </AbsoluteFill>
  );
};
