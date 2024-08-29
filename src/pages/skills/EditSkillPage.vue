<template>
  <header-page></header-page>
  <div class="container">
    <div class="main-body">
      <h2 class="text-white text-center mb-4">Edit Skill</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="updateSkill">
            <div class="mb-3">
              <label for="name" class="form-label">Name:</label>
              <input 
                id="name" 
                v-model="name" 
                @blur="validateField('name')" 
                class="form-control" 
              />
              <p v-if="errors.name" class="my-2 text-red-800">{{ errors.name }}</p>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description:</label>
              <textarea 
                id="description" 
                v-model="description" 
                @blur="validateField('description')" 
                class="form-control"
              ></textarea>
              <p v-if="errors.description" class="my-2 text-red-800">{{ errors.description }}</p>
            </div>

            <div class="mb-3">
              <label for="skillType" class="form-label">Skill Type:</label>
              <select 
                id="skillType" 
                v-model="skillType" 
                @blur="validateField('skillType')" 
                class="form-select"
              >
                <option v-for="type in skillTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <p v-if="errors.skillType" class="my-2 text-red-800">{{ errors.skillType }}</p>
            </div>

            <div class="mb-3">
              <label for="coefficient" class="form-label">Coefficient:</label>
              <input 
                id="coefficient" 
                type="number" 
                step="0.01" 
                v-model="coefficient" 
                @blur="validateField('coefficient')" 
                class="form-control" 
              />
              <p v-if="errors.coefficient" class="my-2 text-red-800">{{ errors.coefficient }}</p>
            </div>

            <button 
              type="submit" 
              class="btn" 
             
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// EditSkillPage.vue
import { onMounted, computed } from 'vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { useSkillsStore } from '@/stores/skills';
import { useRoute, useRouter } from 'vue-router';
import './skillsManagement.css';
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';

export default {
  components: { HeaderPage },
  name: 'EditSkillPage',
  setup() {
    const skillsStore = useSkillsStore();
    const route = useRoute();
    const router = useRouter();

    // Validation schema
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      skillType: Yup.string().required('Skill Type is required'),
      coefficient: Yup.number().required('Coefficient is required').positive('Coefficient must be positive'),
    });

    // Form setup
    const { handleSubmit, errors, isSubmitting, isValid } = useForm({
      validationSchema,
      initialValues: {
        name: '',
        description: '',
        skillType: '',
        coefficient: ''
      }
    });

    const { value: name, setValue: setName, validate: validateName } = useField('name');
    const { value: description, setValue: setDescription, validate: validateDescription } = useField('description');
    const { value: skillType, setValue: setSkillType, validate: validateSkillType } = useField('skillType');
    const { value: coefficient, setValue: setCoefficient, validate: validateCoefficient } = useField('coefficient');

    // Fetch skill details and populate fields on mount
    onMounted(async () => {
      await skillsStore.fetchSkillTypes();
      const skillId = route.params.id;
      await skillsStore.fetchSkillById(skillId);

      const skillData = skillsStore.skillData;
      setName(skillData.name);
      setDescription(skillData.description);
      setSkillType(skillData.skillType);
      setCoefficient(skillData.coefficient);
    });

    // Validate field on blur
    const validateField = async (field) => {
      switch (field) {
        case 'name':
          await validateName();
          break;
        case 'description':
          await validateDescription();
          break;
        case 'skillType':
          await validateSkillType();
          break;
        case 'coefficient':
          await validateCoefficient();
          break;
      }
    };

    // Submit skill function
    const updateSkill = handleSubmit(async () => {
      try {
        const skillId = route.params.id;
        await skillsStore.editSkill({
          id: skillId, 
          name: name.value,
          description: description.value,
          skillType: skillType.value,
          coefficient: coefficient.value,
        });
        router.push('/skills');
      } catch (error) {
        console.error('Error editing skill:', error);
      }
    });

    // Computed property for skill types
    const skillTypes = computed(() => skillsStore.skillTypes);

    return {
      name,
      description,
      skillType,
      coefficient,
      skillTypes,
      updateSkill,
      errors,
      validateField,
      isValid,
      isSubmitting,
    };
  },
};

</script>

<style scoped>
.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.text-red-800 {
  color: #9b2c2c !important;
}
</style>
