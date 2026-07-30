import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "La clé API de l'assistant IA n'est pas configurée dans l'environnement." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const body = await req.json();
    const { action, jobTitle, rawInput, currentText, skills, language = "fr" } = body;

    let systemInstruction = "Tu es un expert RH et rédacteur professionnel de CV haut de gamme. Tes réponses doivent être concises, percutantes et prêtes à être insérées dans un CV.";
    let prompt = "";

    if (action === "generate_summary") {
      prompt = `Rédige un profil professionnel captivant de 2 à 3 phrases pour un CV.
Intitulé de poste: ${jobTitle || 'Professionnel'}
Éléments ou compétences clés à inclure: ${rawInput || 'Compétences techniques et organisationnelles'}
Langue de réponse: ${language === 'fr' ? 'Français' : 'Anglais'}

Fournis directement le texte du résumé professionnel, sans guillemets ni phrases d'introduction.`;
    } else if (action === "enhance_bullet_points" || action === "enhance_experience") {
      prompt = `Tu es un expert RH et rédacteur de CV de haut niveau. Réécris et optimise la description d'expérience professionnelle suivante pour lui donner un impact professionnel maximal auprès des recruteurs.

Informations du poste:
- Intitulé du poste: ${jobTitle || 'Professionnel'}
- Description actuelle ou ébauche:
${currentText || rawInput || 'Réalisations et responsabilités clés.'}

Consignes de rédaction:
1. Utilise des verbes d'action dynamiques (ex: Piloté, Conçu, Développé, Optimisé, Déployé, Négocié).
2. Mets en avant des résultats mesurables, des accomplissements concrets et un vocabulaire professionnel RH.
3. Présente le résultat sous la forme de 3 à 5 puces synthétiques (commençant chacune par "• ").
4. Ne rajoute pas d'introduction, pas de conclusion, pas de texte explicatif, ni de guillemets.
5. Rédige en ${language === 'fr' ? 'Français' : 'Anglais'}.`;
    } else if (action === "suggest_skills") {
      prompt = `Fournis une liste de 8 à 10 compétences clés (techniques et soft skills) les plus recherchées sur le marché actuel pour le poste: "${jobTitle}".
Retourne uniquement une liste d'éléments séparés par des virgules. Rédige en ${language === 'fr' ? 'Français' : 'Anglais'}.`;
    } else if (action === "proofread") {
      prompt = `Corrige et améliore la syntaxe, l'orthographe et le ton professionnel du texte suivant destiné à un CV.
Texte original:
${currentText}

Retourne uniquement le texte corrigé et perfectionné, sans explications.`;
    } else if (action === "translate") {
      const targetLang = body.targetLanguage || 'English';
      prompt = `Traduis fidèlement le texte suivant pour un CV professionnel en ${targetLang}. Garde un vocabulaire professionnel et fluide.
Texte:
${currentText}

Retourne uniquement la traduction.`;
    } else {
      return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur lors de la génération avec l'IA" },
      { status: 500 }
    );
  }
}
