"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

const WEIGHT_MIN = 20;
const WEIGHT_MAX = 250;

const evaluationSchema = z.object({
  type: z.string().min(1, UI_TEXTS.FORM_ERRORS.REQUIRED),
  bodyWeight: z.number().min(WEIGHT_MIN).max(WEIGHT_MAX),
  sj: z.number().optional(),
  cmj: z.number().optional(),
  dj: z.number().optional(),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

interface EvaluationFormProps {
  onSubmit: (data: EvaluationFormData) => void;
}

const INPUT_CLASSES =
  "w-full bg-transparent border-b border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/30 focus:border-on-tertiary-container focus:outline-none pb-2 pt-4 text-sm font-body transition-colors";

const EVALUATION_TYPES = [
  { value: "neuromuscular", label: UI_TEXTS.ASSESSMENT.NEUROMUSCULAR },
  { value: "anthropometry", label: UI_TEXTS.ASSESSMENT.ANTHROPOMETRY },
  { value: "vbt", label: UI_TEXTS.ASSESSMENT.VBT },
];

export function EvaluationForm({ onSubmit }: EvaluationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(
      evaluationSchema,
    ) as unknown as Resolver<EvaluationFormData>,
    defaultValues: { type: "", bodyWeight: 0 },
    mode: "onChange",
  });

  const selectedType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-label-caps text-on-surface-variant/50 block mb-1">
          {UI_TEXTS.ASSESSMENT.TYPE}
        </label>
        <select {...register("type")} className={INPUT_CLASSES}>
          <option value="" className="bg-surface-container">
            Seleccionar tipo
          </option>
          {EVALUATION_TYPES.map((type) => (
            <option
              key={type.value}
              value={type.value}
              className="bg-surface-container"
            >
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-on-tertiary-container text-xs mt-1">
            {errors.type.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-label-caps text-on-surface-variant/50 block mb-1">
          {UI_TEXTS.ASSESSMENT.BODY_WEIGHT}
        </label>
        <input
          type="number"
          step="0.1"
          {...register("bodyWeight", { valueAsNumber: true })}
          className={INPUT_CLASSES}
          placeholder="kg"
        />
        {errors.bodyWeight && (
          <p className="text-on-tertiary-container text-xs mt-1">
            {errors.bodyWeight.message}
          </p>
        )}
      </div>

      {selectedType === "neuromuscular" && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-label-caps text-on-surface-variant/50 block mb-1">
              {UI_TEXTS.METRICS.SJ}
            </label>
            <input
              type="number"
              step="0.1"
              {...register("sj", { valueAsNumber: true })}
              className={INPUT_CLASSES}
              placeholder="cm"
            />
          </div>
          <div>
            <label className="text-label-caps text-on-surface-variant/50 block mb-1">
              {UI_TEXTS.METRICS.CMJ}
            </label>
            <input
              type="number"
              step="0.1"
              {...register("cmj", { valueAsNumber: true })}
              className={INPUT_CLASSES}
              placeholder="cm"
            />
          </div>
          <div>
            <label className="text-label-caps text-on-surface-variant/50 block mb-1">
              {UI_TEXTS.METRICS.DJ}
            </label>
            <input
              type="number"
              step="0.1"
              {...register("dj", { valueAsNumber: true })}
              className={INPUT_CLASSES}
              placeholder="cm"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={!isValid}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {UI_TEXTS.ACTIONS.SAVE}
        </Button>
      </div>
    </form>
  );
}
