import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LaunchNotice from "@/components/LaunchNotice";
import TopVoters from "@/components/vote/TopVoters";
import { SpinningCoin } from "@/components/shop/Visual";
import { network, voteRewardOf, type VoteReward } from "@/lib/data/network";
import { crates } from "@/lib/data/cosmetics";
import { site } from "@/lib/data/site";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Voter",
  description: "Vote pour MCBloc et gagne des pièces et des coffres en jeu. Le launcher partenaire Aevum rapporte encore plus !",
};

const crateById = Object.fromEntries(crates.map((c) => [c.id, c]));
const pct = (n: number) => `${Math.round(n * 1000) / 10} %`;

export default function VotePage() {
  const sites = [...network.votes.sites].sort((a, b) => Number(!!b.partner) - Number(!!a.partner));
  const base = network.votes.defaultReward;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Voter</p>
        <h1 className="font-display text-4xl sm:text-5xl">
          Vote pour <span className="text-gradient">MCBloc</span>
        </h1>
        <p className="mt-3 text-muted">
          Chaque vote fait connaître le serveur et te rapporte des {network.currency.plural} et des chances de gagner des coffres. Le launcher partenaire
          rapporte encore plus !
        </p>
      </header>

      {!site.launched && (
        <div className="mb-10">
          <LaunchNotice title="Les votes ouvrent avec le serveur" compact>
            Tu pourras voter et recevoir tes récompenses en jeu dès l&apos;ouverture de MCBloc.
          </LaunchNotice>
        </div>
      )}

      {/* Sites de vote */}
      <section aria-labelledby="sites">
        <h2 id="sites" className="mb-5 font-display text-2xl">
          Où voter
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {sites.map((s) => {
            const r = voteRewardOf(s);
            return (
              <article
                key={s.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-surface p-6 ${s.partner ? "border-accent md:col-span-2" : "border-line"}`}
                style={s.partner ? { boxShadow: "0 24px 60px -30px rgba(255,216,77,0.6)" } : undefined}
              >
                <div className={`flex flex-col gap-6 ${s.partner ? "md:flex-row md:items-center" : ""}`}>
                  <div className="flex-1">
                    {s.partner && (
                      <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-bg">
                        <Icon name="star" size={12} /> Partenaire · récompenses ×{Math.round(r.coins / base.coins)}
                      </span>
                    )}
                    <h3 className="font-display text-2xl">{s.name}</h3>
                    {s.howTo && <p className="mt-2 text-sm text-muted">{s.howTo}</p>}
                    <p className="mt-2 text-xs text-muted">Un vote toutes les {s.cooldownHours} h</p>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn-bloc mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-3 font-bold ${s.partner ? "bg-accent text-bg" : "bg-gradient-brand text-white"}`}
                    >
                      Voter sur {s.name} <Icon name="arrow-right" size={16} />
                    </a>
                  </div>
                  <RewardBox reward={r} highlight={!!s.partner} />
                </div>
              </article>
            );
          })}
          <article className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-line p-6 text-muted">
            <p className="font-display text-xl text-text">D&apos;autres sites arrivent</p>
            <p className="mt-2 text-sm">
              Chaque site de vote supplémentaire rapportera {formatNumber(base.coins)} {network.currency.plural} et{" "}
              {base.crates.map((c) => `${pct(c.chance)} de chance de ${crateById[c.id]?.name.toLowerCase() ?? c.id}`).join(", ")}.
            </p>
          </article>
        </div>
      </section>

      {/* Paliers */}
      <section aria-labelledby="paliers" className="mt-14">
        <h2 id="paliers" className="font-display text-2xl">
          Paliers du mois
        </h2>
        <p className="mt-2 text-muted">En plus de chaque vote, atteins ces paliers dans le mois pour gagner un coffre garanti. Le compteur repart à zéro chaque mois.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {network.votes.milestones.map((m) => {
            const c = crateById[m.crate];
            return (
              <li key={m.votes} className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5">
                {c?.image && <Image src={c.image} alt="" width={56} height={56} style={{ imageRendering: "pixelated" }} className="animate-float-sm" />}
                <div>
                  <p className="font-display text-3xl text-primary">{m.votes}</p>
                  <p className="text-sm text-muted">votes · {c?.name ?? m.crate}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Comment voter */}
      <section aria-labelledby="comment" className="mt-14 grid gap-6 md:grid-cols-2">
        <div>
          <h2 id="comment" className="font-display text-2xl">
            Comment voter ?
          </h2>
          <ol className="mt-5 space-y-4">
            {[
              "Clique sur un site de vote ci-dessus.",
              "Entre ton pseudo Minecraft exact (attention aux majuscules) et valide ton vote.",
              "Ta récompense arrive automatiquement en jeu, même si tu n'es pas connecté : elle t'attend à ta prochaine connexion.",
              "En jeu, tape /vote pour voir les sites disponibles et ton nombre de votes du mois.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 font-display text-primary">{i + 1}</span>
                <span className="text-text/90">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <TopVoters />
      </section>
    </div>
  );
}

function RewardBox({ reward, highlight }: { reward: VoteReward; highlight: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-accent/40 bg-accent/5 md:w-80" : "border-line bg-bg-2"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Récompense par vote</p>
      <p className="mt-2 flex items-center gap-2 font-display text-2xl text-accent">
        <SpinningCoin size={28} /> {formatNumber(reward.coins)} {network.currency.plural}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm">
        {reward.crates.map((c) => {
          const crate = crateById[c.id];
          return (
            <li key={c.id} className="flex items-center gap-2">
              {crate?.image && <Image src={crate.image} alt="" width={22} height={22} style={{ imageRendering: "pixelated" }} />}
              <span>
                <strong>{pct(c.chance)}</strong> de chance : {crate?.name ?? c.id}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
